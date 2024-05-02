package com.moment.configuration;


import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;
import java.util.UUID;
import javax.servlet.http.Part;
import com.amazonaws.HttpMethod;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.moment.diary.personal.model.PsnSQL;

public class AwsSAO {

    private static AwsSAO instance;
    private AmazonS3 s3bucket;
    private String bucketName;
    ConnectionPool cp = null;

    // private 생성자
    private AwsSAO() {
        connect();
        cp = ConnectionPool.getInstance();
    }

    // 싱글톤 인스턴스 반환 메소드
    public static synchronized AwsSAO getInstance() {
        if (instance == null) {
            instance = new AwsSAO();
        }
        return instance;
    }

    // AWS S3 연결 설정
    private void connect() {

        // awsRds.properties 파일 로드
        Properties properties = new Properties();
        InputStream is = AwsSAO.class.getResourceAsStream("/awsRds.properties");

        try {
            if (is == null) {
                throw new FileNotFoundException("awsRds.properties file not found");
            }

            properties.load(is);

            this.bucketName = properties.getProperty("bucketName");
            String accessId = properties.getProperty("accessId");
            String accessKey = properties.getProperty("accessKey");

            // AWS S3 클라이언트 설정
            BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessId, accessKey);
            this.s3bucket =
                    AmazonS3ClientBuilder.standard()
                            .withRegion(Regions.AP_NORTHEAST_2)
                            .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                            .build();
        } catch (Exception e) {
            System.out.println("AWS S3 연결 실패 / connect()");
        }
    }

    public void uploadImageAndSaveKeys(Part filePart, String boardWriter) throws IOException, SQLException {
        // 고유한 파일 이름 생성
        String uniqueFileName = UUID.randomUUID().toString() + "_" + filePart.getSubmittedFileName();

        InputStream fileContent = filePart.getInputStream();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(filePart.getSize());

        try {
            // 고유한 파일 이름으로 S3에 파일 업로드
            s3bucket.putObject(new PutObjectRequest(bucketName, uniqueFileName, fileContent, metadata));
        } catch (Exception e) {
            System.out.println("파일 업로드 실패 / uploadPartFile()");
        }

        // S3에서 파일 URL 가져오기
        String imageUrl = s3bucket.getUrl(bucketName, uniqueFileName).toString();

        if (imageUrl != null) {

            // board 테이블에 이미지 키 저장
            try( Connection conn = cp.connect();
                 PreparedStatement pstmt = conn.prepareStatement(PsnSQL.UPDATE_IMAGE_KEY.getQuery());) {

                pstmt.setString(1, uniqueFileName);
                pstmt.setString(2, boardWriter);
                pstmt.executeUpdate();
            } catch (SQLException e) {
                System.out.println("이미지 키 저장 실패 / saveImageKeyToBoard()");
            }

            // board_image 테이블에 이미지 데이터 저장
            try (Connection conn = cp.connect();
                 PreparedStatement pstmt = conn.prepareStatement(PsnSQL.INSERT_IMAGE_DATA.getQuery());) {

                pstmt.setString(1, uniqueFileName);
                pstmt.setString(2, filePart.getSubmittedFileName());
                pstmt.setString(3, imageUrl);
                pstmt.setString(4, boardWriter);
                pstmt.executeUpdate();

            } catch (SQLException e) {
                System.out.println("이미지 데이터 저장 실패 / saveImageDataToBoardImage()");
            }
        }
    }

    // 파일 삭제
    public void deleteFile(String keyName) {
        s3bucket.deleteObject(bucketName, keyName);
    }

}

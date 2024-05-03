package com.moment.configuration;

import com.moment.diary.personal.model.PsnSQL;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;
import java.util.UUID;
import javax.servlet.http.Part;

public class AwsSAO {

    private static AwsSAO instance;
    private S3Client s3bucket;
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
            AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessId, accessKey);
            this.s3bucket = S3Client.builder()
                    .region(Region.AP_NORTHEAST_2)
                    .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                    .build();
        } catch (Exception e) {
            System.out.println("AWS S3 연결 실패 / connect()");
        }
    }

    public void uploadImageAndSaveKeys(Part filePart, String boardWriter) throws IOException {
        // 고유한 파일 이름 생성
        String uniqueFileName = UUID.randomUUID() + "_" + filePart.getSubmittedFileName();

        InputStream fileContent = filePart.getInputStream();

        try {
            // 고유한 파일 이름으로 S3에 파일 업로드
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(uniqueFileName)
                    .contentLength(filePart.getSize())
                    .build();

            s3bucket.putObject(putObjectRequest, software.amazon.awssdk.core.sync.RequestBody.fromInputStream(fileContent, filePart.getSize()));
        } catch (Exception e) {
            System.out.println("파일 업로드 실패 / uploadPartFile()");
        }

        // S3에서 파일 URL 가져오기
        String imageUrl = s3bucket.utilities().getUrl(builder -> builder.bucket(bucketName).key(uniqueFileName)).toString();

        if (imageUrl != null) {

            // board_image 테이블에 이미지 데이터 저장
            try (Connection conn = cp.connect();
                 PreparedStatement pstmt1 = conn.prepareStatement(PsnSQL.INSERT_IMAGE_DATA.getQuery())) {

                pstmt1.setString(1, uniqueFileName);
                pstmt1.setString(2, filePart.getSubmittedFileName());
                pstmt1.setString(3, imageUrl);
                pstmt1.setString(4, boardWriter);
                pstmt1.executeUpdate();

                // board 테이블에 이미지 키 업데이트
                PreparedStatement pstmt2 = conn.prepareStatement(PsnSQL.UPDATE_IMAGE_KEY.getQuery());
                pstmt2.setString(1, uniqueFileName);
                pstmt2.setString(2, boardWriter);
                pstmt2.executeUpdate();

            } catch (SQLException e) {
                System.out.println("이미지 데이터 저장 실패 / saveImageDataToBoardImage()");
                e.printStackTrace();
            }
        }
    }


    // 파일 삭제
    public void deleteFile(String keyName) {
        s3bucket.deleteObject(builder -> builder.bucket(bucketName).key(keyName));
    }

}

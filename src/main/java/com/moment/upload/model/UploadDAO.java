package com.moment.upload.model;

import com.google.api.client.http.InputStreamContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.Permission;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UploadDAO {

    public File uploadFile(Drive service, String fileName, InputStream fileContent) throws IOException {
        System.out.println("\n\n == 파일 업로드 시작== ");

        File fileMetaData = new File();
        fileMetaData.setName(fileName);
        fileMetaData.setParents(Collections.singletonList("1X9_ZPsTGA5HivK8CP8kMFDjbwqRl5Q-O"));

        InputStreamContent uploadStreamContent = new InputStreamContent(null, fileContent);
        File uploadedFile = service.files().create(fileMetaData, uploadStreamContent).execute();

        Permission permission = new Permission();
        permission.setType("anyone");
        permission.setRole("reader");
        service.permissions().create(uploadedFile.getId(), permission).execute();

        return uploadedFile;
    }

    public List<UploadDTO> getFileList(Drive service) throws IOException {
        String folderId = "1X9_ZPsTGA5HivK8CP8kMFDjbwqRl5Q-O"; // your folder ID
        List<File> files = service.files().list().setQ("'" + folderId + "' in parents").setFields("files(id, name, webViewLink, thumbnailLink)").execute().getFiles();
        List<UploadDTO> dtos = new ArrayList<>();

        for (File file : files) {
            UploadDTO dto = new UploadDTO();
            dto.setFile(file);
            dto.setFileName(file.getName());
            dto.setWebViewLink(file.getWebViewLink()); // set web view link
            dto.setImageUrl(file.getThumbnailLink()); // set thumbnail link as image URL
            dtos.add(dto);
        }

        return dtos;
    }

    private void setImageUrl(UploadDTO uploadDTO) {
        String fileId = uploadDTO.getFile().getId();
        String imageUrl = "https://drive.google.com/uc?export=view&id=" + fileId;
        uploadDTO.setImageUrl(imageUrl);
    }
}

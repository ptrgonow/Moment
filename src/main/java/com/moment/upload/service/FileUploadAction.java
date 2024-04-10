package com.moment.upload.service;

import com.google.api.services.drive.Drive;
import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.controller.DriveQuickstart;
import com.moment.upload.model.UploadDAO;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.List;

public class FileUploadAction implements Action {

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        DiskFileItemFactory factory = new DiskFileItemFactory();
        factory.setSizeThreshold(1000 * 1024 * 1024);  // 1 GB

        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setSizeMax(1024 * 1024 * 500);

        UploadDAO dao = new UploadDAO();

        try {

            List<FileItem> items = upload.parseRequest(request);
            for (FileItem item : items) {
                if (!item.isFormField()) {
                    InputStream fileContent = item.getInputStream();

                    DriveQuickstart driveQuickstart = new DriveQuickstart();
                    Drive service = driveQuickstart.getDriveService();

                    dao.uploadFile(service, item.getName(), fileContent);
                    System.out.println("파일 업로드 성공");
                }
            }
        } catch (FileUploadException e) {
            System.out.println("파일 업로드 실패" + e);
        }

        ActionForward forward = new ActionForward();
        forward.setRedirect(false);
        forward.setPath("list.go");
        return forward;
    }
}

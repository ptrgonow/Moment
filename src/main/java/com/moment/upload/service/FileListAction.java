package com.moment.upload.service;

import com.google.api.services.drive.Drive;
import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.controller.DriveQuickstart;
import com.moment.upload.model.UploadDAO;
import com.moment.upload.model.UploadDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;


public class FileListAction implements Action {

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        DriveQuickstart driveQuickstart = new DriveQuickstart();
        Drive service = driveQuickstart.getDriveService();

        UploadDAO dao = new UploadDAO();
        List<UploadDTO> uploadDTOs = dao.getFileList(service);

        request.setAttribute("files", uploadDTOs);

        ActionForward forward = new ActionForward();
        forward.setRedirect(false);
        forward.setPath("views/upload/uploadList.jsp");

        return forward;
    }
}

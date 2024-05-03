package com.moment.controller;

import com.moment.action.Action;
import com.moment.action.ActionForward;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.util.Properties;
import java.util.StringTokenizer;

@MultipartConfig
public class FrontController extends HttpServlet {
  
    public FrontController() {
        super();
    }


    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");

        String contextPath = request.getContextPath();
        String requestURI = request.getRequestURI().replaceFirst(contextPath + "/", "");
        int lastIndex = requestURI.lastIndexOf("/");
        if (lastIndex != -1) {
            requestURI = requestURI.substring(lastIndex + 1);
        }
        System.out.println("Request URI: " + requestURI);


        Action action = null;
        ActionForward forward = null;
        Properties prop = new Properties();
        // TODO : 본인들 파일 경로 잘 확인해서 fileInputStream 경로 설정하기
        FileInputStream fis = new FileInputStream("/Users/patrick/Downloads/NCS/Dairy/Moment/src/main/java/com/moment/configuration/mapping.properties");
        prop.load(fis);
        String value = prop.getProperty(requestURI).trim();
        System.out.println("value: " + value);

        if(value.startsWith("execute")) {

            StringTokenizer st = new StringTokenizer(value, "|");
            String url_1 = st.nextToken();
            String url_2 = st.nextToken();
            System.out.println("url_1: " + url_1);
            System.out.println("url_2: " + url_2);

            try {

                Class<?> url = Class.forName(url_2);
                Constructor<?> constructor = url.getConstructor();
                action = (Action) constructor.newInstance();
                forward = action.execute(request, response);

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        } else {
            forward = new ActionForward();
            forward.setRedirect(false);
            forward.setPath(value);
        }

        if(forward != null){
            if(forward.isRedirect()){
                response.sendRedirect(forward.getPath());
            } else {
                request.getRequestDispatcher(forward.getPath()).forward(request, response);
            }
        }
    }
}

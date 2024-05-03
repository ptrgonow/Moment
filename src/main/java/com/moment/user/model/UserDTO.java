package com.moment.user.model;

public class UserDTO {

    private int userNo;
    private String userId;
    private String userPwd;
    private String userName;
    private boolean loginSuccess;
    private String message;

    public int getUserNo( ) {
        return userNo;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }

    public String getUserId( ) {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserPwd( ) {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }

    public String getUserName( ) {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public boolean isLoginSuccess( ) {
        return loginSuccess;
    }

    public void setLoginSuccess(boolean loginSuccess) {
        this.loginSuccess = loginSuccess;
    }

    public String getMessage( ) {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

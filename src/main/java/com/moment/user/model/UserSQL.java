package com.moment.user.model;

public enum UserSQL {

    GET_MAX_NUM("SELECT IFNULL(MAX(user_no), 0) FROM user"),

    INSERT_USER("INSERT INTO user (user_no, user_id, user_pwd, user_name) VALUES (?, ?, ?, ?)"),

    USER_LOGIN("SELECT * FROM user WHERE user_id = ? AND user_pwd = ?"),

    ;




    private final String query;

    UserSQL(String query) {
        this.query = query;
    }

    public String getQuery() {
        return query;
    }
}

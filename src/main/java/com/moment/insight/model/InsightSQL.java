package com.moment.insight.model;

import com.moment.action.Action;

public enum InsightSQL {


    GET_TODAY_DIARY("SELECT COUNT(1) AS todayDiaryCount FROM board WHERE DATE(board_date) = CURDATE()"),

    GET_TODAY_WRITE("SELECT COUNT(DISTINCT board_writer) FROM board WHERE DATE(board_date) = CURDATE()")

    ;


    private final String query;

    InsightSQL(String query) {
        this.query = query;
    }

    public String getQuery() {return query;}


}

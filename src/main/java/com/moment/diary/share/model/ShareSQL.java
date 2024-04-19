package com.moment.diary.share.model;

public enum ShareSQL {

    SELECTION_SHARE_LIST("SELECT * FROM board ORDER BY board_no DESC"),

    CONTENT_SHARE("SELECT * FROM board WHERE board_no = ?")
    ;


    private final String query;

    ShareSQL(String query) {
        this.query = query;
    }

    public String getQuery() {return query;}

}

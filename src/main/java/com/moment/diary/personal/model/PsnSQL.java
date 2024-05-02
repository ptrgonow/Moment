package com.moment.diary.personal.model;

public enum PsnSQL {

    INSERT_IMAGE_DATA ("INSERT INTO board_image (image_no, file_name, file_url, image_writer) VALUES (?, ?, ?, ?)"),

    UPDATE_IMAGE_KEY("UPDATE board SET image_key = ? WHERE board_writer = ?"),




    ;




    private final String query;

    PsnSQL(String query) {
        this.query = query;
    }

    public String getQuery() {
        return query;
    }
}

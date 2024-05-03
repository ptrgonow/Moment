package com.moment.diary.personal.model;

public enum PsnSQL {

    // 글 쓰기

    GET_MAX_BOARD_NO("SELECT IFNULL(MAX(board_no), 0) FROM board"),

    INSERT_BOARD("INSERT INTO board (board_no, board_writer, board_cont, board_date, board_update, board_hit, board_like) VALUES (?, ?, ?, NOW(), null, 0, 0)"),




    // 이미지 업로드

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

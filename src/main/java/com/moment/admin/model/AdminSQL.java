package com.moment.admin.model;

/*

            열거형 클래스 (Enum class)

        상수 값을 선언하는 방법 중 하나로 열거형 클래스를 사용할 수 있다.
        SQL 쿼리문은 대부분 변경되지 않는 상수 값이기 때문에 열거형 클래스로 선언하여 사용하면 편리하다.

            형식)

                public enum 열거형 클래스 이름 {
                    상수1, 상수2, 상수3, ...
                }

        대문자로 작성한다. (SELECTION, INSERTION, DELETION, UPDATE)

        ex) SELECTION_SHOP_PRODUCT_ALL("query 1"),
        ex) SELECTION_NOTICE_LIST("query 2"), ;


     */
public enum AdminSQL {

    // 공지사항 쿼리

    COUNT_NOTICE("SELECT COUNT(*) FROM notice"),

    SELECTION_NOTICE_LIST("SELECT * FROM notice ORDER BY notice_no DESC LIMIT ? OFFSET ?"),

    SELECTION_MAX_NOTICE_NO("SELECT IFNULL(MAX(notice_no), 0) + 1 FROM notice"),

    INSERT_NOTICE("INSERT INTO notice VALUES (?, ?, ?, ?, now())"),

    DELETE_NOTICE("DELETE FROM notice WHERE notice_no = ?"),

    UPDATE_NOTICE_NO("UPDATE notice SET notice_no = notice_no - 1 WHERE notice_no > ?"),

    UPDATE_NOTICE_CONTENT("UPDATE notice SET notice_title = ?, notice_writer = ?, notice_cont = ? WHERE notice_no = ?"),

    // 관리자 목록

    GET_ADMIN_LIST("SELECT * FROM admin"),

    GET_ADMIN_CONT("SELECT * FROM admin WHERE admin_no = ?"),

    // 관리자 로그인

    ADMIN_LOGIN_CHECK("select * from admin where admin_Id = ?"),

    // 관리자 등록

    INSERT_ADMIN("INSERT INTO admin VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"),

    SELECTION_MAX_ADMIN_NO("SELECT IFNULL(MAX(admin_no), 0) FROM admin"),

    SELECTION_ADMIN("SELECT * FROM admin ORDER BY admin_no DESC"),

    // 테이블에서 grade 와 team 컬럼의 정보를 중복제거 해서 가져오기
    SELECT_COLUMN_TEAM("SELECT DISTINCT admin_team FROM admin"),

    SELECT_COLUMN_GRADE("SELECT DISTINCT admin_grade FROM admin")



    ;


    private final String query;

    AdminSQL(String query) {
        this.query = query;
    }

    public String getQuery() {
        return query;
    }
}

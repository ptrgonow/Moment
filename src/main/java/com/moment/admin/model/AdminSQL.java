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

    SELECTION_NOTICE_LIST("SELECT * FROM notice ORDER BY notice_no DESC"),



    ;

    private final String query;

    AdminSQL(String query) {
        this.query = query;
    }

    public String getQuery() {
        return query;
    }
}

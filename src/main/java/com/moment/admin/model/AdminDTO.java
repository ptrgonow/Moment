package com.moment.admin.model;

public class AdminDTO {

    private int notice_no;
    private String notice_title;
    private String notice_writer;
    private String notice_cont;
    private String notice_date;

    public int getNotice_no( ) {
        return notice_no;
    }

    public void setNotice_no(int notice_no) {
        this.notice_no = notice_no;
    }

    public String getNotice_title( ) {
        return notice_title;
    }

    public void setNotice_title(String notice_title) {
        this.notice_title = notice_title;
    }

    public String getNotice_writer( ) {
        return notice_writer;
    }

    public void setNotice_writer(String notice_writer) {
        this.notice_writer = notice_writer;
    }

    public String getNotice_cont( ) {
        return notice_cont;
    }

    public void setNotice_cont(String notice_cont) {
        this.notice_cont = notice_cont;
    }

    public String getNotice_date( ) {
        return notice_date;
    }

    public void setNotice_date(String notice_date) {
        this.notice_date = notice_date;
    }
}

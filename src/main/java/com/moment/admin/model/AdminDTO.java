package com.moment.admin.model;

public class AdminDTO {

    private int noticeNo;
    private String noticeTitle;
    private String noticeWriter;
    private String noticeCont;
    private String noticeDate;

    public int getNoticeNo( ) {
        return noticeNo;
    }

    public void setNoticeNo(int noticeNo) {
        this.noticeNo = noticeNo;
    }

    public String getNoticeTitle( ) {
        return noticeTitle;
    }

    public void setNoticeTitle(String noticeTitle) {
        this.noticeTitle = noticeTitle;
    }

    public String getNoticeWriter( ) {
        return noticeWriter;
    }

    public void setNoticeWriter(String noticeWriter) {
        this.noticeWriter = noticeWriter;
    }

    public String getNoticeCont( ) {
        return noticeCont;
    }

    public void setNoticeCont(String noticeCont) {
        this.noticeCont = noticeCont;
    }

    public String getNoticeDate( ) {
        return noticeDate;
    }

    public void setNoticeDate(String noticeDate) {
        this.noticeDate = noticeDate;
    }
}

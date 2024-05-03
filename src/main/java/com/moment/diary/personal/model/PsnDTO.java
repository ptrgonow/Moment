package com.moment.diary.personal.model;

public class PsnDTO {

    private int boardNo;
    private String boardWriter;
    private String boardCont;
    private String boardDate;
    private String boardUpdate;
    private int boardHit;
    private int boardLike;

    public int getBoardNo( ) {
        return boardNo;
    }

    public void setBoardNo(int boardNo) {
        this.boardNo = boardNo;
    }

    public String getBoardWriter( ) {
        return boardWriter;
    }

    public void setBoardWriter(String boardWriter) {
        this.boardWriter = boardWriter;
    }

    public String getBoardCont( ) {
        return boardCont;
    }

    public void setBoardCont(String boardCont) {
        this.boardCont = boardCont;
    }

    public String getBoardDate( ) {
        return boardDate;
    }

    public void setBoardDate(String boardDate) {
        this.boardDate = boardDate;
    }

    public String getBoardUpdate( ) {
        return boardUpdate;
    }

    public void setBoardUpdate(String boardUpdate) {
        this.boardUpdate = boardUpdate;
    }

    public int getBoardHit( ) {
        return boardHit;
    }

    public void setBoardHit(int boardHit) {
        this.boardHit = boardHit;
    }

    public int getBoardLike( ) {
        return boardLike;
    }

    public void setBoardLike(int boardLike) {
        this.boardLike = boardLike;
    }
}

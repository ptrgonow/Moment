package com.moment.diary.personal.model;

import com.moment.configuration.ConnectionPool;
import com.moment.diary.personal.model.PsnSQL;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class PsnDAO {

    private static PsnDAO instance = null;

    ConnectionPool cp = null;

    private PsnDAO() {
        cp = ConnectionPool.getInstance();
    }

    public static PsnDAO getInstance() {
        if (instance == null) {
            instance = new PsnDAO();
        }
        return instance;
    }

    public int getMaxBoardNo() {
        int boardNo = 0;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(PsnSQL.GET_MAX_BOARD_NO.getQuery());
             ResultSet rs = pstmt.executeQuery()) {

            if (rs.next()) {
                boardNo = rs.getInt(1) + 1;
            }

        } catch (Exception e) {
            System.out.println("에러 : getMaxBoardNo()");
        }

        return boardNo;
    }

    public int insertBoard(PsnDTO dto) {
        int result = 0;
        int boardNo = getMaxBoardNo();

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(PsnSQL.INSERT_BOARD.getQuery())) {

            pstmt.setInt(1, boardNo);
            pstmt.setString(2, dto.getBoardWriter());
            pstmt.setString(3, dto.getBoardCont());

            result = pstmt.executeUpdate();

        } catch (Exception e) {
            System.out.println("에러 : insertBoard()");
            e.printStackTrace();
        }

        return result;
    }


}

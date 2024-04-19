package com.moment.diary.share.model;

import com.moment.admin.model.AdminSQL;
import com.moment.configuration.ConnectionPool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ShareDAO {

    private static ShareDAO instance = null;

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    ConnectionPool cp = null;

    private ShareDAO() {
        cp = ConnectionPool.getInstance();
    }

    public static ShareDAO getInstance() {
        if (instance == null) {
            instance = new ShareDAO();
        }
        return instance;
    }

    public void connect() {
        conn = cp.connect();
    }

    public void disconnect(PreparedStatement pstmt, Connection conn) {
        cp.disconnect(pstmt, conn);
    }

    public void disconnect(ResultSet rs, PreparedStatement pstmt, Connection conn) {
        cp.disconnect(rs, pstmt, conn);
    }

    // 공유 게시판 리스트를 보여주는 메서드
    public List<ShareDTO> getShareList() throws SQLException {
        List<ShareDTO> list = new ArrayList<>();
        ShareDTO dto = null;
        connect();

        pstmt = conn.prepareStatement(ShareSQL.SELECTION_SHARE_LIST.getQuery());
        rs = pstmt.executeQuery();

        while (rs.next()) {

            dto = new ShareDTO();

            dto.setBoardNo(rs.getInt("board_no"));
            dto.setBoardTitle(rs.getString("board_title"));
            dto.setBoardWriter(rs.getString("board_writer"));
            dto.setBoardCont(rs.getString("board_cont"));
            dto.setBoardDate(rs.getString("board_date"));
            dto.setBoardUpdate(rs.getString("board_update"));
            dto.setBoardHit(rs.getInt("board_hit"));
            dto.setBoardLike(rs.getInt("board_like"));

            list.add(dto);
        }

        disconnect(rs, pstmt, conn);
        return list;
    }   // getShareList 메서드 end

    // 상세정보를 보여주는 메서드
    public ShareDTO shareContent(int boardNo) throws SQLException {

        ShareDTO dto = null;
        connect();
        pstmt = conn.prepareStatement(ShareSQL.CONTENT_SHARE.getQuery());
        pstmt.setInt(1, boardNo);
        rs = pstmt.executeQuery();

        if (rs.next()) {

            dto = new ShareDTO();

            dto.setBoardNo(rs.getInt("board_no"));
            dto.setBoardTitle(rs.getString("board_title"));
            dto.setBoardWriter(rs.getString("board_writer"));
            dto.setBoardCont(rs.getString("board_cont"));
            dto.setBoardDate(rs.getString("board_date"));
            dto.setBoardUpdate(rs.getString("board_update"));
            dto.setBoardHit(rs.getInt("board_hit"));
            dto.setBoardLike(rs.getInt("board_like"));


        }
        disconnect(rs, pstmt, conn);
        return dto;
    }

}

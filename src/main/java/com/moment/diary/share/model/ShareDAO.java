package com.moment.diary.share.model;

import com.moment.configuration.ConnectionPool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ShareDAO {

    private static ShareDAO instance = null;
    private ConnectionPool cp = null;

    private ShareDAO() {
        cp = ConnectionPool.getInstance();
    }

    public static ShareDAO getInstance() {
        if (instance == null) {
            instance = new ShareDAO();
        }
        return instance;
    }

    public List<ShareDTO> getShareList() {
        List<ShareDTO> list = new ArrayList<>();
        String query = ShareSQL.SELECTION_SHARE_LIST.getQuery();

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(query);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                ShareDTO dto = getAll(rs);
                list.add(dto);
            }
        } catch (Exception e) {
            System.out.println("getShareList() 에러 : " + e);
        }
        return list;
    }

    public ShareDTO getShareContent(int boardNo) {
        ShareDTO dto = null;
        String query = ShareSQL.CONTENT_SHARE.getQuery();

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(query)) {

            pstmt.setInt(1, boardNo);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    dto = getAll(rs);
                }
            }
        } catch (Exception e) {
            System.out.println("getShareContent() 에러 : " + e);
        }
        return dto;
    }

    private ShareDTO getAll(ResultSet rs) throws SQLException, SQLException {
        ShareDTO dto = new ShareDTO();
        dto.setBoardNo(rs.getInt("board_no"));
        dto.setBoardTitle(rs.getString("board_title"));
        dto.setBoardWriter(rs.getString("board_writer"));
        dto.setBoardCont(rs.getString("board_cont"));
        dto.setBoardDate(rs.getString("board_date"));
        dto.setBoardUpdate(rs.getString("board_update"));
        dto.setBoardHit(rs.getInt("board_hit"));
        dto.setBoardLike(rs.getInt("board_like"));
        return dto;
    }
}

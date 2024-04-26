package com.moment.admin.model;

import com.moment.configuration.ConnectionPool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class NoticeDAO {

    private static NoticeDAO instance = null;

    ConnectionPool cp = null;

    private NoticeDAO() {
        cp = ConnectionPool.getInstance();
    }

    public static NoticeDAO getInstance() {
        if (instance == null) {
            instance = new NoticeDAO();
        }
        return instance;
    }

    public int getTotalNoticeCount() {
        int count = 0;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(AdminSQL.COUNT_NOTICE.getQuery());
             ResultSet rs = pstmt.executeQuery()) {

            if (rs.next()) {
                count = rs.getInt(1);
            }
        } catch (SQLException e) {
            System.out.println("공지사항 수 조회 에러 : " + e);
        }

        return count;
    }

    public List<NoticeDTO> getNoticeList(int page, int size) {
        List<NoticeDTO> list = new ArrayList<>();

        int startNo = (page * size) - (size - 1);
        int endNo = (page * size);


        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(AdminSQL.SELECTION_NOTICE_LIST.getQuery())) {
            pstmt.setInt(1, startNo); 
            pstmt.setInt(2, endNo);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    NoticeDTO dto = new NoticeDTO();
                    dto.setNoticeNo(rs.getInt("notice_no"));
                    dto.setNoticeTitle(rs.getString("notice_title"));
                    dto.setNoticeWriter(rs.getString("notice_writer"));
                    dto.setNoticeCont(rs.getString("notice_cont"));
                    dto.setNoticeDate(rs.getString("notice_date"));
                    list.add(dto);
                }
            }
        } catch (SQLException e) {
            System.out.println("페이징 처리 에러 : " + e);
        }

        return list;
    }

    public int insertNotice(NoticeDTO dto) throws SQLException {
        int result = 0;
        int noticeNo = 0;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(AdminSQL.SELECTION_MAX_NOTICE_NO.getQuery());
             ResultSet rs = pstmt.executeQuery()) {

            if (rs.next()) {
                noticeNo = rs.getInt(1);
            }

            try (PreparedStatement pstmtInsert = conn.prepareStatement(AdminSQL.INSERT_NOTICE.getQuery())) {
                pstmtInsert.setInt(1, noticeNo);
                pstmtInsert.setString(2, dto.getNoticeTitle());
                pstmtInsert.setString(3, dto.getNoticeWriter());
                pstmtInsert.setString(4, dto.getNoticeCont());
                result = pstmtInsert.executeUpdate();
            }

        } catch (SQLException e) {
            System.out.println("등록 에러 : " + e);
        }

        return result;
    }

    public int deleteNotice(int noticeNo) {
        int result = 0;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(AdminSQL.DELETE_NOTICE.getQuery())) {
            pstmt.setInt(1, noticeNo);
            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("삭제 에러 : " + e);
        }

        return result;
    }

    public void updateSequence(int noticeNo) {
        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(AdminSQL.UPDATE_NOTICE_NO.getQuery())) {
            pstmt.setInt(1, noticeNo);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("번호 조정 에러 : " + e);
        }
    }

    public int updateNotice(NoticeDTO dto) {
        int result = 0;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(AdminSQL.UPDATE_NOTICE_CONTENT.getQuery())) {
            pstmt.setString(1, dto.getNoticeTitle());
            pstmt.setString(2, dto.getNoticeWriter());
            pstmt.setString(3, dto.getNoticeCont());
            pstmt.setInt(4, dto.getNoticeNo());
            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("수정 에러 : " + e);
        }

        return result;
    }
}

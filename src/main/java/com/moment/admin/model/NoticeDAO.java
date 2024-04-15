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

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
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

    public void connect() {
        cp.connect();
    }

    public void disconnect(PreparedStatement pstmt, Connection conn) {
        cp.disconnect(pstmt, conn);
    }

    public void disconnect(ResultSet rs, PreparedStatement pstmt, Connection conn) {
        cp.disconnect(rs, pstmt, conn);
    }

    public List<NoticeDTO> getNoticeList() throws SQLException {

        List<NoticeDTO> list = new ArrayList<>();
        NoticeDTO dto = null;
        connect();

        pstmt = conn.prepareStatement(AdminSQL.SELECTION_NOTICE_LIST.getQuery());
        rs = pstmt.executeQuery();

        while (rs.next()) {
            dto = new NoticeDTO();
            dto.setNoticeNo(rs.getInt("notice_no"));
            dto.setNoticeTitle(rs.getString("notice_title"));
            dto.setNoticeCont(rs.getString("notice_cont"));
            dto.setNoticeDate(rs.getString("notice_date"));

            list.add(dto);
        }

        disconnect(rs, pstmt, conn);

        return list;
    }
}

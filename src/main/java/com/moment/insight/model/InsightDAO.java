package com.moment.insight.model;

import com.moment.configuration.ConnectionPool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class InsightDAO {

    private static InsightDAO instance = null;

    ConnectionPool cp = null;

    private InsightDAO( ) {

        cp = ConnectionPool.getInstance();
    }

    public static InsightDAO getInstance( ) {
        if (instance == null) {
            instance = new InsightDAO();
        }
        return instance;
    }


    public int getTodayDiary() {
        int count = 0;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(InsightSQL.GET_TODAY_DIARY.getQuery());
             ResultSet rs = pstmt.executeQuery()) {
            if (rs.next()) {
                count = rs.getInt(1);
            }
        } catch (Exception e) {
            System.out.println("getTodayDiary() error" + e);
        }
        return count;
    }


    public int getTodayWrite() {
        int count = 0;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(InsightSQL.GET_TODAY_WRITE.getQuery());
             ResultSet rs = pstmt.executeQuery()) {

            if (rs.next()) {
                count = rs.getInt(1);
            }

        } catch (Exception e) {
            System.out.println("getTodayWrite() error" + e);
        }

        return count;
    }
}

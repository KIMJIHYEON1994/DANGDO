package com.study.dangdospring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.study.dangdospring.dto.BoardWriteDto;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@Entity(name="TB_BOARD")
@Table(name="TB_BOARD")
@NoArgsConstructor
@AllArgsConstructor
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardSeq;
    private String boardTitle;
    private String boardContent;
    private String boardPrice;
    private int boardSort;
    private int boardLike;
    private String boardEmail;
    private String boardImg;
    private int boardCnt;
    @CreationTimestamp
    @Column(name = "board_date")
    private LocalDateTime boardDate;

    public BoardEntity(BoardWriteDto dto) {
        this.boardSeq = dto.getBoardSeq();
        this.boardTitle = dto.getBoardTitle();
        this.boardContent = dto.getBoardContent();
        this.boardPrice = dto.getBoardPrice();
        this.boardSort = dto.getBoardSort();
        this.boardLike = dto.getBoardLike();
        this.boardEmail = dto.getBoardEmail();
        this.boardImg = dto.getBoardImg();
        this.boardCnt = dto.getBoardCnt();
    }
}

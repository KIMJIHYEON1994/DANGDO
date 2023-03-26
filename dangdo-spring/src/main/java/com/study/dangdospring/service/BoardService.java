package com.study.dangdospring.service;

import com.study.dangdospring.dto.BoardDeleteDto;
import com.study.dangdospring.dto.BoardWriteDto;
import com.study.dangdospring.dto.ResponseDto;
import com.study.dangdospring.entity.BoardEntity;
import com.study.dangdospring.repository.BoardRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoardService {

    @Autowired
    BoardRepository boardRepository;

    public ResponseDto<?> boardWrite(BoardWriteDto dto) {
        String boardEmail = dto.getBoardEmail();
        String boardTitle = dto.getBoardTitle();
        String boardContent = dto.getBoardContent();
        String boardPrice = dto.getBoardPrice();
        String boardImg = dto.getBoardImg();

//        try {
//            if (BoardRepository.existsById(userEmail))
//                return ResponseDto.setFailed("Existed Email");
//        } catch (Exception error) {
//            return ResponseDto.setFailed("Data Base Error!");
//        }
//        if (!userPwd.equals(userPwdChk))
//            return ResponseDto.setFailed("Password does not matched!");

        BoardEntity boardEntity = new BoardEntity(dto);
        boardEntity.setBoardEmail(boardEmail);
        boardEntity.setBoardTitle(boardTitle);
        boardEntity.setBoardContent(boardContent);
        boardEntity.setBoardPrice(boardPrice);
        boardEntity.setBoardImg(boardImg);


        try {
            boardRepository.save(boardEntity);
        } catch (Exception e) {
            return ResponseDto.setFailed("Data Base Error");
        }

        return ResponseDto.setSuccess("Success!", null);
    }
    public ResponseDto<List<BoardEntity>> getList() {
        List<BoardEntity> boardList = new ArrayList<BoardEntity>();
        try {
            boardList = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "boardSeq")); // 정렬 추가하기(seq 내림차순)
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed("Database Error");
        }
        return ResponseDto.setSuccess("Success", boardList);
    }

//    public boardDelete(Integer boardSeq) {
//        boardRepository.deleteById(String.valueOf(boardSeq));
//        return ResponseDto.setSuccess("Delete Success!",)
//    }
    public void deleteBoard(BoardDeleteDto dto) {
        int boardSeq = dto.getBoardSeq();
        boardRepository.deleteBoardEntityByBoardSeq(boardSeq);
//            List<BoardEntity> boardList = boardRepository.findAll();
//            return ResponseDto.setSuccess("Delete Success!", boardList);
    }
}

import React, { useEffect, useState } from "react";
import { useUserStore } from "../../stores";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import {
  CardActionArea,
  Grid,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import "./style.css";
import { writeApi } from "../../apis"; //
import instance from "../../apis";


export default function BoardMain() {
  
  const [userProfile, setuserProfile] = useState<any>();

  const [boardSeq, setBoardSeq] = useState<any>();
  const [boardEmail, setBoardEmail] = useState<String>();
  const [boardImg, setBoardImg] = useState<any>();
  const [boardTitle, setBoardTitle] = useState<String>();
  const [boardContent, setBoardContent] = useState<String>();
  const [boardPrice, setBoardPrice] = useState<String>();
  const [boardSort, setBoardSort] = useState<any>();
  const [boardDate, setBoardDate] = useState<String>();

  const [data, setData] = useState<boardData2[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { username } = useUserStore();

  interface boardData2 {
    boardSeq: number;
    boardTitle: string;
    boardContent: string;
    boardPrice: string;
    boardSort: number;
  } 



  const writeHandle = async () => {
    const data = {
      boardSeq,
      boardEmail,
      boardImg,
      boardTitle,
      boardContent,
      boardPrice,
      boardSort,
      boardDate,
    };

    const writeResponse = await writeApi(data);

    if (!writeResponse) {
      alert("게시글 등록에 실패했습니다.");
      console.log(boardEmail);
      return;
    }
    if (!writeResponse.result) {
      alert("게시글 등록에 실패했습니다.");
      console.log(boardEmail);
      return;
    }
    alert("게시글 등록에 성공했습니다.");
    // setAuthView(false);
  };

  // Modal 열고 닫고
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // useEffect(() => {
  //   setuserProfile(username);
  //   setBoardEmail(username);
  // }, [username]);

  const getBoardList = (page: number) => {
    instance
      .get(`/api/board/list`) //?page=${page}&size=${pageSize}
      .then((response: any) => {
        console.log("check");
        console.log(response.data.data);
        setData(response.data.data);
        setCurrentPage(page);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBoardList(currentPage);
  }, [currentPage]);

  return (
    <Box id="wrapper">
      <Box id="writeBtn">
        <Typography variant="h5" mt={1} ml={2} fontWeight="bold">
          게시글
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          글작성
        </Button>
      </Box>
      {/* // 게시글 작성 */}
      <Box id="imgCard">
        <Modal open={open} onClose={handleClose} id="md">
          <Box id="item" sx={style}>
            <IconButton color="inherit" id="tfBtn" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Box margin="30px">
              <Box id="imgBox">
                <Button id="imgBtn" component="label">
                  {/* {userProfile ? ('') : ('Save')} */}
                  {boardImg ? "" : "Save"}
                  <img src={userProfile} id="boardImg" />
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(e) => boardImg(e)}
                  />
                </Button>
              </Box>
              <Box marginBottom="30px">
                <TextField
                  variant="filled"
                  fullWidth
                  label="제목"
                  type="text"
                  id="tf"
                  onChange={(e) => setBoardTitle(e.target.value)}
                />
              </Box>
              <Box marginBottom="30px">
                <TextField
                  variant="filled"
                  fullWidth
                  label="내용"
                  multiline
                  rows={5}
                  type="text"
                  id="tf"
                  onChange={(e) => setBoardContent(e.target.value)}
                />
              </Box>
              <Box marginBottom="30px">
                <TextField
                  variant="filled"
                  fullWidth
                  label="가격"
                  type="text"
                  id="tf"
                  onChange={(e) => setBoardPrice(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">원</InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Button
                id="tfBtn"
                variant="contained"
                onClick={() => writeHandle()}
              >
                작성하기
              </Button>
              <Button id="tfBtn" variant="contained" onClick={handleClose}>
                뒤로가기
              </Button>
            </Box>
          </Box>
        </Modal>
        

        <Grid container spacing={5}>
        {data.map((data : boardData2) => { return (
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={userProfile}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                     {data.boardTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.boardContent}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
        )
     })};
        </Grid>
  
      </Box>
      <Box id="listBtn">
        <Button>더 많은 상품 보기</Button>
      </Box>
    </Box>
  );
}

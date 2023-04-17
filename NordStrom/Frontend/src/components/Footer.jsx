import { Box, Img, Flex } from "@chakra-ui/react";
import React from "react";
import Footerlink from "./Footerlink";

function Footer() {
  return (
    <Box
      style={{
        backgroundColor: "#eae6e3"
      }}
    >
      <Box>
        <Footerlink />
        <Flex justifyContent="right">
          <Img
            w={{ base: "100px", md: "150px" }}
            mr={10}
            src="https://cdn.pixabay.com/photo/2021/02/08/15/44/social-media-5995266_960_720.png"
            alt=""
          />
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;

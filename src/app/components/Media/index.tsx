import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";


export default function Media(props) {
  return (
      <ImageList cols={5}>
        {props.loading && <div>loading...</div>}
        {props.error && (
            <div>{`There is a problem fetching the post data - ${props.error}`}</div>
        )}
        {props.data.map(({ id, title, search, display, cover }) => (
            <ImageListItem key={id}>
              <img
                  src={`${cover}?w=135&h=200`}
                  alt="cover"
                  loading="lazy"
              />
              <ImageListItemBar
                  title={title}
                  subtitle={display}
                  sx={{ display: { xs: 'none', md: 'flex' } }}
              />
            </ImageListItem>
        ))}
      </ImageList>
  )
}

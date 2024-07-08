import * as React from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export const FiCard = ({ variant = 'cover', children }: { variant?: string; children: React.ReactNode }) => {
  let width: { xs: string; sm: string } = { xs: '110px', sm: '150px' };
  let height: { xs: string; sm: string } = { xs: '165px', sm: '225px' };

  switch (variant) {
    case 'row':
      width = { xs: '100%', sm: '100%' };
      height = { xs: '125px', sm: '125px' };
      break;
    case 'banner':
      width = { xs: '100%', sm: '100%' };
      height = { xs: '125px', sm: '125px' };
      break;
  }

  return (
    <Card
      sx={{
        cursor: 'pointer',
        width: width,
        height: height,
        position: 'relative',
        '&:hover': {
          '& .fiCardActions': { display: 'block' },
          '& .fiCardExtra': { display: 'block' },
          '& .coverDescription': { display: 'block' },
          '& .fiCardFooter': { display: 'none' },
          '& .fiCardContent': { backgroundColor: 'rgba(0,0,0,0.8)' },
        },
      }}
    >
      {children}
    </Card>
  );
};

export const FiCardActionArea = ({ children }: { children: React.ReactNode }) => (
  <CardActionArea sx={{ position: 'relative' }}>{children}</CardActionArea>
);

export const FiCardActions = ({ children }: { children: React.ReactNode }) => (
  <CardActions
    className="fiCardActions"
    sx={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      pb: 1.5,
      display: 'none',
      // backgroundColor: 'rgba(0,0,0,0.8)',
    }}
  >
    {children}
  </CardActions>
);
export const FiCardExtra = ({ children }: { children: React.ReactNode }) => (
  <Box
    className="fiCardExtra"
    sx={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      display: 'none',
      pb: 1.5,
    }}
  >
    {children}
  </Box>
);

export const FiCardContent = ({ children }: { children: React.ReactNode }) => (
  <CardContent
    className="fiCardContent"
    sx={{
      p: '3px 3px',
      position: 'relative',
      backgroundColor: 'rgba(0,0,0,0.6)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    }}
  >
    {children}
  </CardContent>
);

export const FiCardFooter = ({ children }: { children: React.ReactNode }) => (
  <Box
    className="fiCardFooter"
    sx={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      pb: 1.5,
      pr: 1.0,
      pl: 1.0,
      display: 'inherit',
    }}
  >
    {children}
  </Box>
);
export const FiCardMedia = ({ image, title }: { image: string; title: string }) => (
  <CardMedia
    className="fiCardMedia"
    sx={{
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%',
      width: '100%',
    }}
    image={image}
    title={title}
  />
);

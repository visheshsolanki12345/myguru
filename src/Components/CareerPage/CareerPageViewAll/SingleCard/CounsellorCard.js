import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@material-ui/core';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { timeSince } from '../../../CommanFunction/time';


const CounsellorCard = ({ data }) => {
    return (
        <Fragment>
            {
                data && data.map((e) =>
                    <div>
                        <Link to={`/counsellor-page/${e.id}`} >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image={`${process.env.REACT_APP_API_URL}` + e.user.profile.userPic}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Name : {e.user.last_name}
                                    </Typography>

                                    <Typography gutterBottom variant="h5" component="div">
                                        email : {e.user.email}
                                    </Typography>

                                    <Typography gutterBottom variant="h5" component="div">
                                        carrer : {e.carrer.carrer}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        aboutUs : {e.aboutUs}
                                        address : {e.address}
                                        area : {e.area}
                                        college : {e.college}
                                        dateOfBirth : {e.dateOfBirth}
                                        designation : {e.designation}
                                        experience : {e.experience}
                                        gender : {e.gender}
                                        mobile : {e.mobile}
                                        language : {e.language}
                                        pincode : {e.pincode}
                                        price : {e.price}
                                        qualification : {e.qualification}
                                        title : {e.title}
                                        Rating : {e.rating}
                                        No View : {e.noView}
                                        Join Date : {timeSince(e.createAt)}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Link>
                    </div>
                )
            }
        </Fragment>
    )
};

export default CounsellorCard;

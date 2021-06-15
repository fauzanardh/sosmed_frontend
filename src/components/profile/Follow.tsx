import React from 'react';
import {
    Button,
    Card,
    CardActions,
} from '@material-ui/core';
import axios from "axios";

export const Follow = (props: any) => {
    const isFollowed = () => {
        const index = props.followers.map((user: any) => user.id).indexOf(props.myUUID);
        return index !== -1;
    }
    const followUser = () => {
        let data;
        if (isFollowed()) {
            data = {followStatus: false};
        } else {
            data = {followStatus: true};
        }
        axios({
            method: "post",
            url: `http://localhost:8001/user/follow/${props.uuid}`,
            data: data,
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                window.location.reload();
            }
        });
    }
    return (
        <Card {...props}>
            <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    onClick={followUser}
                >
                    {isFollowed() ? "Unfollow" : "Follow"}
                </Button>
            </CardActions>
        </Card>
    );
}

export default Follow;

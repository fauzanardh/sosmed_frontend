import React from 'react';
import {
    Button,
    Card,
    CardActions,
} from '@material-ui/core';
import axios from "axios";
import ErrorDialog from "../errors/ErrorDialog";

export const Follow = (props: any) => {
    const isFollowed = () => {
        const index = props.followers.map((user: any) => user.id).indexOf(props.myUUID);
        return index !== -1;
    }
    const [errorDialog, setErrorDialog] = React.useState(false);
    const followUser = () => {
        let data;
        if (isFollowed()) {
            data = {followStatus: false};
        } else {
            data = {followStatus: true};
        }
        axios({
            method: "post",
            url: `https://api.klipboard.me/user/follow/${props.uuid}`,
            data: data,
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                window.location.reload();
            }
        }).catch(() => setErrorDialog(true));
    }
    return (
        <div>
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
            <ErrorDialog isOpen={errorDialog}/>
        </div>
    );
}

export default Follow;

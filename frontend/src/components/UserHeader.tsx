import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setUserName } from '../redux/reducers/userReducer';

import { generateRandomUrlImage } from "../utils/random";

function UserHeader() {

    const userName = useAppSelector((state) => state.userReducer.myInfo.userName);

    const [imgUrl, setImgUrl] = useState(generateRandomUrlImage);
    const [displayName, setDisplayName] = useState(userName);

    const dispatch = useAppDispatch();

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handlerSaveName();
        }
    };

    const handlerSaveName = () => {

        if (displayName.trim() === '') {
            alert("UserName can't be empty");
            return;
        }

        setDisplayName(displayName.trim());
        dispatch(setUserName(displayName));
    };

    const handleClickImg = () => {
        setImgUrl(generateRandomUrlImage());
    };

    return (
        <header className="bg-dark d-flex flex-row align-items-center px-3 py-2">

            <img
                role='button'
                className="me-3 rounded-circle"
                alt='Client Img'
                src={imgUrl}
                style={{ width: "40px" }}
                onClick={handleClickImg}
            />

            <div className="input-group">

                <input
                    type="text"
                    name='user-name'
                    className="form-control"
                    placeholder="Username"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    maxLength={20}
                    draggable="false"
                    onKeyDown={handleKeyPress}
                />

                <button className="btn btn-outline-secondary" onClick={handlerSaveName}>
                    <i className="bi bi-cloud-arrow-down"></i>
                </button>

            </div>
        </header>
    );
}

export default UserHeader;
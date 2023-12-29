import { useState, useEffect } from 'react'

import UserInfo from '../interfaces/UserInfo'
import { generateRandomUserName } from "../utils/random";

interface UserHeaderProps {
    onSetUserInfo: (info: UserInfo) => void;
}

function UserHeader({ onSetUserInfo }: UserHeaderProps) {

    const imgUrl = 'https://picsum.photos/40';

    const [canEdit, setCanEdit] = useState(false);
    const [userName, setUserName] = useState(generateRandomUserName);

    useEffect(() => {
        handlerSaveName();
    }, []);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handlerSaveName();
        }
    };

    const handlerSaveName = () => {

        if (!userName) {
            alert("UserName can't be empty");
            setCanEdit(true);
            return;
        }

        const info: UserInfo = {
            userName: userName,
        };

        onSetUserInfo(info);
        setCanEdit(false);
    }

    return (
        <header className="bg-dark d-flex flex-row align-items-center px-3 py-2">

            <img className="me-3 rounded-circle" src={imgUrl} alt="Img" />

            <div className="input-group">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    readOnly={!canEdit}
                    draggable="false"
                    onKeyDown={handleKeyPress}
                />

                {!canEdit && (
                    <span className="input-group-text btn btn-outline-secondary" role="button" onClick={() => { setCanEdit(true); }}>
                        <i className="bi bi-pencil-square"></i>
                    </span>
                )}

                {canEdit && (
                    <span className="input-group-text btn btn-outline-success" role="button" onClick={handlerSaveName}>
                        <i className="bi bi-cloud-arrow-down"></i>
                    </span>
                )}

            </div>
        </header>
    );
}

export default UserHeader;
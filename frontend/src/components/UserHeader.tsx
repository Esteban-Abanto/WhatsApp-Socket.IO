import { useState, useEffect } from 'react'

import IUser from '../interfaces/IUser'
import { generateRandomUserName } from "../utils/random";

interface UserHeaderProps {
    onSetUserInfo: (info: IUser) => void;
}

function UserHeader({ onSetUserInfo }: UserHeaderProps) {

    const imgUrl = 'https://picsum.photos/id/237/40';

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

        if (userName.trim() === '') {
            alert("UserName can't be empty");
            setCanEdit(true);
            return;
        }

        setUserName(userName.trim());

        const info: IUser = {
            userName: userName,
        };

        onSetUserInfo(info);
        setCanEdit(false);
    }

    return (
        <header className="bg-dark d-flex flex-row align-items-center px-3 py-2">

            <img className="me-3 rounded-circle" src={imgUrl} style={{ width: "40px" }} />

            <div className="input-group">

                <input
                    type="text"
                    name='user-name'
                    className="form-control"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    readOnly={!canEdit}
                    draggable="false"
                    onKeyDown={handleKeyPress}
                />

                {!canEdit && (
                    <button className="btn btn-outline-secondary" onClick={() => { setCanEdit(true); }}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                )}

                {canEdit && (
                    <button className="btn btn-outline-secondary" onClick={handlerSaveName}>
                        <i className="bi bi-cloud-arrow-down"></i>
                    </button>
                )}

            </div>
        </header>
    );
}

export default UserHeader;
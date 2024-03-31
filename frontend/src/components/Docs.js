import React from 'react';
import { CopyBlock } from 'react-code-blocks';
import { FaCopy } from 'react-icons/fa';
import copy from 'copy-to-clipboard';
import AppAppBar from './AppAppBar';
import Typography from '@mui/material/Typography';

const Docs = () => {
    const code1 = '!/bin/bash';
    const code2 = 'IAM_USER_NAME="terraforge"';
    const code3 = 'aws iam create-user --user-name $IAM_USER_NAME';
    const code4 = 'aws iam attach-user-policy --user-name $IAM_USER_NAME --policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess ; \
    aws iam create-access-key --user-name $IAM_USER_NAME';
    const language = 'javascript';

    const myCustomTheme = {backgroundColor: "#222", codeColor: "#ccc", textColor: "#ccc"};
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AppAppBar />
            <div style={{ marginTop: '80px', padding: '30px 100px'}}>
                <Typography>Hello</Typography>
                <CopyBlock
                    text={code1}
                    language={language}
                    showLineNumbers={false}
                    wrapLines={true}
                    theme={myCustomTheme} 
                    codeBlock
                    icon={<FaCopy />}
                    onCopy={() => copy(code1)}
                />
                <Typography>Set Variables</Typography>
                <CopyBlock
                    text={code2}
                    language={language}
                    showLineNumbers={false}
                    wrapLines={true}
                    theme={myCustomTheme} 
                    codeBlock
                    icon={<FaCopy />}
                    onCopy={() => copy(code2)}
                />
                <Typography>Create IAM Username</Typography>
                <CopyBlock
                    text={code3}
                    language={language}
                    showLineNumbers={false}
                    wrapLines={true}
                    theme={myCustomTheme} 
                    codeBlock
                    icon={<FaCopy />}
                    onCopy={() => copy(code3)}
                />
                <Typography>Attach AmazonEC2FullAccess policy to IAM user and output access keys</Typography>
                <CopyBlock
                    text={code4}
                    language={language}
                    showLineNumbers={false}
                    wrapLines={true}
                    theme={myCustomTheme} 
                    codeBlock
                    icon={<FaCopy />}
                    onCopy={() => copy(code4)}
                />
            </div>
        </div>                                      
    );
};

export default Docs;

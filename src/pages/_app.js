import React, {useState, useEffect} from "react";
import {useGlobal} from "reactn";
import {usePrevious} from "../util";

import {userProvider} from "../providers";
import {BaseLayout} from "../components";
import {createGlobalStyle} from "styled-components";
import stylesheet from "antd/dist/antd.min.css";

export default ({Component, pageProps}) => {
    const [title, setTitle] = useState(null);

    const [globalAuthUser, setGlobalAuthUser] = useGlobal("authUser");

    const prevGlobalAuthUser = usePrevious(globalAuthUser);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const authUser = await userProvider.getUser();
                await setGlobalAuthUser(authUser);
            } catch (error) {
                await setGlobalAuthUser(null);
            }
        };
        if (!prevGlobalAuthUser || !globalAuthUser) initializeApp();
    }, [globalAuthUser]);

    return <>
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <GlobalStyle/>
        <BaseLayout title={title}>
            <Component setPageTitle={setTitle}
                       {...pageProps}/>
        </BaseLayout>
    </>;
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  h3 {
    font-size: 1rem;
  }
  
  .ant-input-disabled {
    color: rgba(0,0,0,.65) !important;
  }
  
  .ant-input, .ant-select {
    height: 2rem !important;
    font-size: 1rem !important;
  }
  
  .ant-input-group-addon {
    font-size: 1rem !important;
  }
  
  .ant-upload-wrapper {
    overflow: hidden;
    display: flex;
  }
  
  .ant-input-affix-wrapper {
    max-height: 2.5rem !important
  }

  .ant-table-thead {
    .ant-table-cell {
      background-color: #1890ff;
      color: white;
    }
  }
`;

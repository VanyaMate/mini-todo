import { Collapse } from 'antd';
import React from 'react';


export interface IAntdCollapseProps {
    title: string;
    children: React.ReactNode;
}

const AntdCollapse: React.FC<IAntdCollapseProps> = (props) => (
    <Collapse
        collapsible="header"
        defaultActiveKey={ [ '1' ] }
        items={ [
            {
                key     : '1',
                label   : props.title,
                children: props.children,
            },
        ] }
    />
);

export default AntdCollapse;
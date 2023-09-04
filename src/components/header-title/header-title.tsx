import React from 'react';
import css from './header-title.module.scss';


export interface IHeaderTitleProps {
    title: string;
}

const HeaderTitle: React.FC<IHeaderTitleProps> = (props) => {
    return (
        <h1 className={ css.container }>
            { props.title }
        </h1>
    );
};

export default HeaderTitle;
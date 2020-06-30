// @flow
import React from 'react'
import styled from 'styled-components'

import { getDomain, timeDifference } from '../utils'
import { type ThemeType } from '../types'

const Row: ThemeType = styled.li`
    display: flex;
    min-height: 36px;
    align-items: center;
    padding: 10px;
`
const Column = styled.div`
    padding-right: 10px;
    width: 84px;
    min-width: 84px;
    align-items: center;
    justify-content: center;
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media (max-width: 768px) {
        width: 60px;
        min-width: 60px;
    }
`
const VoteColumn = styled(Column)`
    color: ${props =>
        props.points > 100
            ? '#b94a00'
            : props.points > 75
            ? '#8e3800'
            : props.points > 50
            ? '#4e2910'
            : 'init'};
`
const TextColumn = styled.div`
    padding-right: 10px;
    min-width: 80px;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        flex-direction: column;
    }
    @media (max-width: 420px) {
        line-height: 1.4;
    }
`
const PrimaryText = styled.div`
    padding-right: 4px;
`
const TextItem = styled.div`
    padding-right: 4px;
    font-size: 85%;
`
const Link = styled.span`
    color: #616161;
    a:link {
        color: #505050;
    }
`

const ByText = styled.span`
    color: #616161;
`
const Details = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const HideButton = styled.button`
    cursor: pointer;
    border: none;
    background: transparent;
    font-size: 85%;
    padding: 0;
    color: #505050;
`
const UpVoteButton = styled.button`
    background: url('/icons/triangle.svg');
    background-repeat: no-repeat;
    height: 16px;
    width: 16px;
    border: none;
    cursor: pointer;
`

type Props = {
    objectID: number,
    title: string,
    num_comments: number,
    points: number,
    url: string,
    author: string,
    created_at: string,
    onUpVote: (objectID: number) => void,
    onHide: (objectID: number) => void,
}
export default function item({
    objectID,
    title,
    num_comments,
    points,
    url,
    author,
    created_at,
    onUpVote,
    onHide,
}: Props) {
    const handleUpVote = () => {
        onUpVote(objectID)
    }
    const handleHide = () => {
        onHide(objectID)
    }
    return (
        <Row>
            <Column>{num_comments || 0}</Column>
            <VoteColumn points={points || 0}>{points || 0}</VoteColumn>
            <Column>
                <UpVoteButton aria-label={'up vote'} onClick={handleUpVote}></UpVoteButton>
            </Column>
            <TextColumn>
                {title && (
                    <PrimaryText>
                        <a href={url}>{title}</a>
                    </PrimaryText>
                )}
                <Details>
                    {url && (
                        <TextItem>
                            <Link>
                                (<a href={url}>{getDomain(url)}</a>)
                            </Link>
                        </TextItem>
                    )}
                    {author && (
                        <TextItem>
                            <ByText>{'by '}</ByText>
                            <label>{author}</label>
                        </TextItem>
                    )}
                    <TextItem>
                        <label>{timeDifference(new Date(created_at))}</label>
                    </TextItem>
                </Details>
                <TextItem>
                    <Link>
                        {'[ '}
                        <HideButton onClick={handleHide}>{'Hide'}</HideButton>
                        {' ]'}
                    </Link>
                </TextItem>
            </TextColumn>
        </Row>
    )
}

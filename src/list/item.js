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
    min-width: 90px;
    align-items: center;
    justify-content: center;
    display: flex;
    @media (max-width: 768px) {
        width: 60px;
        max-width: 60px;
        min-width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
const TextColumn = styled.div`
    padding-right: 10px;
    min-width: 90px;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`
const PrimaryText = styled.div`
    padding-right: 4px;
`
const TextItem = styled.div`
    padding-right: 4px;
    font-size: 8pt;
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
    font-size: 8pt;
    padding: 0;
    color: #505050;
`
const UpVoteButton = styled.button``

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
            <Column>{num_comments || '0'}</Column>
            <Column>{points || '0'}</Column>
            <Column>
                <UpVoteButton onClick={handleUpVote}>^</UpVoteButton>
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

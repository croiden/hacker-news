// @flow
import React from 'react'
import styled from 'styled-components'

import { getDomain } from '../utils'
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

type Props = {
    objectID: number,
    title: string,
    num_comments: number,
    points: number,
    url: string,
    author: string,
    created_at: string,
}
export default function item({ title, num_comments, points, url, author, created_at }: Props) {
    return (
        <Row>
            <Column>{num_comments || '0'}</Column>
            <Column>{points || '0'}</Column>
            <Column>
                <button>^</button>
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
                        <label>{created_at}</label>
                    </TextItem>
                </Details>
                <TextItem>
                    <Link>
                        [ <a href={'!#'}>{'Hide'}</a> ]
                    </Link>
                </TextItem>
            </TextColumn>
        </Row>
    )
}

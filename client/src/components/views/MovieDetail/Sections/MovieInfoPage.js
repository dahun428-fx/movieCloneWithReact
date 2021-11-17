import React from 'react';
import { Descriptions, Badge} from 'antd';


function MovieInfoPage(props){
    const {
        original_title : originalTitle,
        release_date : releaseDate,
        revenue,
        runtime,
        vote_average : voteAverage,
        vote_count : voteCount,
        status,
        popularity } = props.movie;
    return (
        <>
            <Descriptions title="Movie Info" bordered>
                <Descriptions.Item label="Title">{originalTitle}</Descriptions.Item>
                <Descriptions.Item label="release_date">{releaseDate}</Descriptions.Item>
                <Descriptions.Item label="revenue">{revenue}</Descriptions.Item>
                <Descriptions.Item label="runtime">{runtime}</Descriptions.Item>
                <Descriptions.Item label="vote_average" span={2}>{voteAverage}</Descriptions.Item>
                <Descriptions.Item label="vote_count">{voteCount}</Descriptions.Item>
                <Descriptions.Item label="status">{status}</Descriptions.Item>
                <Descriptions.Item label="popularity">{popularity}</Descriptions.Item>
            </Descriptions>
        </>
    )
}
export default MovieInfoPage;
function parse(d) {
  if (d.likes >= 1000000) {
    return {
      video_id: d.video_id,
      title: d.title,
      trending_data: d.trending_data,
      category: d.category,
      views: +d.view_count,
      comments: +d.comment_count,
      likes: +d.likes,
      dislikes: +d.dislikes,
    };
  }
}
d3.csv('youtube.csv', parse).then(function (data) {
  console.log(data);
});

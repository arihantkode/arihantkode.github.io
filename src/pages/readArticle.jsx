import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import "./styles/readArticle.css";
import { Card } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NavBar from "../components/common/navBar";
import INFO from "../data/user";
import SEO from "../data/seo";

const currentSEO = SEO.find((item) => item.page === "articles");

const Blog = () => {
	const [posts, setPosts] = useState([]);
	const [title, setTitle] = useState("");
	const getPostData = () => {
	  axios
		.get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@arihantk.ind")
		.then((res) => {
		  console.log("got result : ", res);
		  setPosts(res.data.items);
		  setTitle(res.data.feed.description);
		  console.log(posts);
		})
		.catch((error) => {
		  console.error("Error fetching blog posts:", error);
		});
	};
	useEffect(() => {
	  getPostData();
	}, []);
	return (
	  <div>
		<React.Fragment>
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>
			<div className="page-content">
				<NavBar active="home" />
				<div className="content-wrapper">
					<div className="articles-main-container">
						<div className="articles-logo-container">
							<Typography gutterBottom variant="h4" component="div">
								{title}
							</Typography>
						</div>
						<div className="articles-container">
							{posts.map((post) => (
								<div className="articles-article">
									<Card>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												{post.title}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{post.content.substring(0, 140).replace(/(<([^>]+)>)/ig, '')}...
											</Typography>
										</CardContent>
										<CardActions>
											<Button size="small" href={post.link}>Read More on Medium</Button>
										</CardActions>
									</Card>
								</div>))}
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	  </div>
	);
  };
 
  export default Blog;
  

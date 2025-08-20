import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { BACKEND_URL } from "../../api";

const AnimalImage = ({ src, alt, minHeight = 300 }) => {
	const [error, setError] = useState(false);
	const validSrc = src?.trim() ? `${BACKEND_URL}${src}` : null;

	if (error || !validSrc) {
		return (
			<div
				className="bg-light d-flex align-items-center justify-content-center h-100 rounded-start"
				style={{ minHeight }}
			>
				<span className="text-muted">No image available</span>
			</div>
		);
	}

	return (
		<Card.Img
			src={validSrc}
			alt={alt}
			className="img-fluid rounded-start h-100 object-fit-cover"
			style={{ objectFit: "cover", minHeight }}
			onError={() => setError(true)}
		/>
	);
};

export default AnimalImage;
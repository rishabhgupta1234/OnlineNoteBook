import React, { useEffect } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
	return (
		<div>
			<h2 className="my-2">About iNoteBook</h2>
			<p className="my-3">
				Welcome to iNotebook, your personal digital notebook. With iNotebook, you can effortlessly create, read,
				edit, and delete notes, all within a secure and user-friendly environment.
			</p>

			<h2 className="my-3">Why iNotebook?</h2>

			<div class="accordion" id="accordionExample">
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingOne">
						<button
							class="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseOne"
							aria-expanded="true"
							aria-controls="collapseOne">
							User Friendly
						</button>
					</h2>
					<div
						id="collapseOne"
						class="accordion-collapse collapse show"
						aria-labelledby="headingOne"
						data-bs-parent="#accordionExample">
						<div class="accordion-body">
							<strong>Simple and intuitive design for all users.</strong>
						</div>
					</div>
				</div>
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingTwo">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseTwo"
							aria-expanded="false"
							aria-controls="collapseTwo">
							Mutli User Support
						</button>
					</h2>
					<div
						id="collapseTwo"
						class="accordion-collapse collapse"
						aria-labelledby="headingTwo"
						data-bs-parent="#accordionExample">
						<div class="accordion-body">
							<strong>Individual accounts ensure your notes remain private and secure.</strong>
						</div>
					</div>
				</div>
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingThree">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseThree"
							aria-expanded="false"
							aria-controls="collapseThree">
							Secure
						</button>
					</h2>
					<div
						id="collapseThree"
						class="accordion-collapse collapse"
						aria-labelledby="headingThree"
						data-bs-parent="#accordionExample">
						<div class="accordion-body">
							<strong>Advanced encryption and cloud storage protect your data.</strong>
						</div>
					</div>
				</div>
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingFour">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseFour"
							aria-expanded="false"
							aria-controls="collapseFour">
							Accessible
						</button>
					</h2>
					<div
						id="collapseFour"
						class="accordion-collapse collapse"
						aria-labelledby="headingFour"
						data-bs-parent="#accordionExample">
						<div class="accordion-body">
							<strong>Use iNotebook on any device, anywhere.</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;

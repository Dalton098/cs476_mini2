//Purpose: The engine behind the 3D primitive operations for Mini Assignment 1

vec3 = glMatrix.vec3;

//////////////////////////////////////////////
///********    Geometry Functions   *******///
//////////////////////////////////////////////
//This is where you will have to fill in some code


/**
 * Find the intersection of the ray p0 + tv, t >= 0, with the
 * sphere centered at c with radius r.
 * 
 * @param {vec3} p0 Endpoint of the ray
 * @param {vec3} v Direction of the ray
 * @param {vec3} c Center of the sphere
 * @param {number} r Radius of the sphere
 * 
 * @return {list of vec3} A list of intersection points, in the order in which
 * the ray hits them.  If the ray doesn't hit any points, this list should be empty.
 * Note that a ray can hit at most 2 points on a sphere.
 */
function rayIntersectSphere(p0, v, c, r) {
    //TODO: Fill this in
    return []; //This is a dummy value
}


/**
 * 
 * @param {vec3} a Point a on the triangle
 * @param {vec3} b Point b on the triangle
 * @param {vec3} c Point c on the triangle
 * @param {vec3} p The point whose barycentric coordinates we seek
 * 
 * @return {vec3} An vec3 with the barycentric coordinates
 * 				  [ba, bb, bc] such that ba + bb + bc = 1 and
 * 				  ba, bb, bc > 0
 * 				  If p is not inside of /\abc, then return [0, 0, 0]
 */
function getBarycentricCoords(a, b, c, p) {
	//TODO: Fill this in
	return vec3.create(); // TODO: This is a dummy value
}



function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	    X: evt.clientX - rect.left,
	    Y: evt.clientY - rect.top
	};
}


# Atan2
- Very useful for calculating the necessary x and y paths from source to destination (player to mouse click for ex.)
- vector = {x: (destination.x - source.x), y: (destination.y - source.y)}
- angle = Math.atan2(y,x)
- velocity = {x: Math.cos(angle), y: Math.sin(angle)}

# Normalize vector
- Find the magnitude: Math.sqrt(x^2 + y^2 + z^2)
- Normalized vector = ((x/magnitude), (y/magnitude), (z/magnitude))
- Primary point is to conserve the direction of the vector and its components while removing magnitude/length/distance from the equation

# Get Velocity
- vector = {x: (destination.x - source.x), y: (destination.y - source.y)}
- distance = Math.sqrt(((vector.x^2)+(vector.y^2)))
- velocity = {x: vector.x/distance, y: vector.y/distance}

# Attack/Cast Range
## Method  (more expensive at scale)
- vector = {x: (destination.x - source.x), y: (destination.y - source.y)}
- distance = Math.sqrt(((vector.x^2)+(vector.y^2)))
- if (distance <= range) {attack/cast}
## Method 2 (cheaper at scale)
- vector = {x: (destination.x - source.x), y: (destination.y - source.y)}
- distanceSquared = (vector.x^2)+(vector.y^2)
- rangeSquared = range^2
- if (sqrDistance <= sqrRange) {attack/cast}
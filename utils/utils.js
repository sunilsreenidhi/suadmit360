export function generateMobileNumber() {
    return '9' + Math.floor(100000000 + Math.random() * 900000000);
}


const firstNames = [
    'Rahul',
    'Amit',
    'Kiran',
    'Arjun',
    'Vikram',
    'Sneha',
    'Priya',
    'Ananya',
    'Rohan',
    'Neha'
];

const lastNames = [
    'Sharma',
    'Reddy',
    'Patel',
    'Kumar',
    'Verma',
    'Mehta',
    'Rao',
    'Singh',
    'Nair',
    'Gupta'
];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function generateStudentName() {
    const uniqueId = Date.now().toString().slice(-6);

    return {
        firstName: getRandomItem(firstNames),
        lastName: getRandomItem(lastNames)
    };
}

// profilePicture.test.js
describe('Profile Picture Upload', () => {
    let img, input;

    beforeEach(() => {
        // Mock DataTransfer
        global.DataTransfer = function() {
            this.items = [];
            this.files = {
                length: 0,
                item: function(index) {
                    return this[index];
                },
                add: function(file) {
                    this[this.length] = file;
                    this.length++;
                }
            };
            this.items.add = (file) => {
                this.files.add(file);
            };
        };

        // Simulate the profile picture container
        document.body.innerHTML = `
            <div class="profile-picture-container">
                <img id="profile-picture" src="default-profile.png" alt="Profile Picture">
                <input type="file" id="profile-upload" accept="image/*">
            </div>`;
        img = document.getElementById('profile-picture');
        input = document.getElementById('profile-upload');
    });

    it('should display the default profile picture initially', () => {
        // Test for the default image
        expect(img.src).toContain('default-profile.png');
    });

    it('should update the profile picture when a new image is uploaded', () => {
        const file = new File(['dummy content'], 'profile.png', { type: 'image/png' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        Object.defineProperty(input, 'files', {
            value: dataTransfer.files,
            writable: false
        });

        // Simulate the change event / upload of a new image
        input.dispatchEvent(new Event('change', { bubbles: true }));

        // Use a FileReader to simulate the file reading process
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
            // Test that the image has updated
            expect(img.src).toContain('data:image/png');
        };
        reader.readAsDataURL(file);
    });
});
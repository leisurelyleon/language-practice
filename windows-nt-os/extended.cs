using System;
using System.Windows.Forms;

public class MyForm : Form {
    public MyForm() {
        // Set up the form
        Text = "Windows NT App in C#"
        Size = new System.Drawing.Size(800, 600);

        // Create a button
        Button myButton = new Button();
        myButton.Text = "Click me!";
        myButton.Location = new System.Drawing.Point(100, 100);

        // Attach a click event handler
        myButton.Click += MyButtonClickHandler;

        // Add the button to the form
        Controls.Add(myButton);
    }

    private void MyButtonClickHandler(object sender, EventArgs e) {
        MessageBox.Show("Button clicked!");
    }

    // Entry point for the application
    [STAThread]
    static void Main() {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);

        // Create and run the form
        Application.Run(new MyForm());
    }
}
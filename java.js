import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class CountdownTimerApp extends JFrame {
    private JLabel label;
    private Timer timer;
    private int timeLeft; // in seconds

    public CountdownTimerApp() {
        setTitle("Countdown Timer");
        setSize(300, 150);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new FlowLayout());

        JLabel prompt = new JLabel("Enter minutes:");
        JTextField input = new JTextField(5);
        JButton startBtn = new JButton("Start");
        JButton resetBtn = new JButton("Reset");
        label = new JLabel("00:00", SwingConstants.CENTER);
        label.setFont(new Font("Arial", Font.BOLD, 24));

        add(prompt);
        add(input);
        add(startBtn);
        add(resetBtn);
        add(label);

        // Start button action
        startBtn.addActionListener(e -> {
            try {
                int minutes = Integer.parseInt(input.getText());
                timeLeft = minutes * 60; // convert to seconds
                if (timer != null && timer.isRunning()) {
                    timer.stop();
                }
                timer = new Timer(1000, new ActionListener() {
                    public void actionPerformed(ActionEvent evt) {
                        if (timeLeft >= 0) {
                            int min = timeLeft / 60;
                            int sec = timeLeft % 60;
                            label.setText(String.format("%02d:%02d", min, sec));
                            timeLeft--;
                        } else {
                            label.setText("TIME UP!");
                            timer.stop();
                        }
                    }
                });
                timer.start();
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(null, "Enter valid minutes!");
            }
        });

        // Reset button action
        resetBtn.addActionListener(e -> {
            if (timer != null) timer.stop();
            label.setText("00:00");
            input.setText("");
        });
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new CountdownTimerApp().setVisible(true);
        });
    }
}
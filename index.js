
const { execSync } = require("child_process")

const UnixLepik = require("./javascript/UnixLepik.js");
const WindowsLepik = require("./javascript/WindowsLepik.js");

const isWin = process.platform === "win32";
const psPath = __dirname + "/powershell/LepikShell.ps1";
const packageManagers = ['apt', 'apt-get', 'dnf', 'yum', 'zypper', 'pacman'];

if (!isWin) {
  handleUnixPackageManager()
}

function handleUnixPackageManager() {
  try {
    execSync('which xdotool');
  } catch (err) {
    const foundPM = packageManagers.find(pm => isPackageManagerAvailable(pm));
    if (foundPM) {
      installXdotool(foundPM);
    } else {
      console.log('Error: Could not determine package manager to install xdotool');
      console.log('Try to install xdotool manually and rerun the package');
      process.exit(1);
    }
  }
}

function isPackageManagerAvailable(pm) {
  try {
    execSync(`${pm} -v > /dev/null 2>&1`);
    return true;
  } catch (err) {
    return false;
  }
}

function installXdotool(pm) {
  const installCommands = {
    'apt': ['sudo apt install xdotool -y'],
    'apt-get': ['sudo apt-get install -y xdotool'],
    'dnf': ['sudo dnf install -y xdotool'],
    'yum': ['sudo yum install -y xdotool'],
    'zypper': ['sudo zypper install -y xdotool'],
    'pacman': ['sudo pacman -S --noconfirm xdotool']
  };

  installCommands[pm].forEach(cmd => execSync(cmd));
}

const lepik = isWin ? new WindowsLepik(psPath) : new UnixLepik();

module.exports = lepik;

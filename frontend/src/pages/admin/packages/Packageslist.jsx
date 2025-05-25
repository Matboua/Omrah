import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPackages() {
    // State management
    const [packages, setPackages] = useState([]);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState({
        packages: true,
        classes: false
    });
    const [error, setError] = useState(null);

    // Form states
    const [showPackageForm, setShowPackageForm] = useState(false);
    const [showClassForm, setShowClassForm] = useState(false);
    const [currentPackage, setCurrentPackage] = useState({
        id: null,
        name: '',
        start_date: null,
        end_date: null,
        description: ''
    });
    const [currentClass, setCurrentClass] = useState({
        id: null,
        name: '',
        price:null,
        seats: null,
        features: [],
        package_id: null
    });
    const [newFeature, setNewFeature] = useState('');

    // Fetch packages
    const fetchPackages = useCallback(async () => {
        try {
            setLoading(prev => ({ ...prev, packages: true }));
            setError(null);
            const res = await axios.get('/api/packages');
            setPackages(res.data);
        } catch (err) {
            console.error('Failed to fetch packages:', err);
            setError('Failed to load packages. Please try again.');
            toast.error('Failed to load packages');
        } finally {
            setLoading(prev => ({ ...prev, packages: false }));
        }
    }, []);

    // Fetch classes for a package
    const fetchClasses = async (pkgId) => {
        try {
            setLoading(prev => ({ ...prev, classes: true }));
            const res = await axios.get(`/api/packages/${pkgId}`);
            setClasses(res.data.classes);
        } catch (err) {
            console.error('Failed to fetch package classes:', err);
            toast.error('Failed to load package classes');
        } finally {
            setLoading(prev => ({ ...prev, classes: false }));
        }
    };

    // Handle package selection
    const handleViewClasses = async (pkgId) => {
        if (selectedPackageId === pkgId) {
            setSelectedPackageId(null);
            setClasses([]);
            return;
        }
        // setCurrentClass({ ...currentClass, id: pkgId })
        setSelectedPackageId(pkgId);
        await fetchClasses(pkgId);
    };

    // Package CRUD operations
    const handleAddPackage = () => {
        setCurrentPackage({
            id: null,
            name: '',
            start_date: null,
            end_date: null,
            description: ''
        });
        setShowPackageForm(true);
    };

    const handleEditPackage = (pkg) => {
        setCurrentPackage({
            id: pkg.id,
            name: pkg.name,
            start_date: pkg.start_date,
            end_date: pkg.end_date,
            description: pkg.description
        });
        setShowPackageForm(true);
    };

    const handleDeletePackage = async (pkgId) => {
        if (!window.confirm('Are you sure you want to delete this package?')) return;

        try {
            await axios.delete(`/api/packages/${pkgId}`);
            setPackages(packages.filter(pkg => pkg.id !== pkgId));
            toast.success('Package deleted successfully');
            if (selectedPackageId === pkgId) {
                setSelectedPackageId(null);
                setClasses([]);
            }
        } catch (err) {
            console.error('Failed to delete package:', err);
            toast.error('Failed to delete package');
        }
    };

    const handlePackageSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentPackage.id) {
                // Update existing package
                await axios.put(`/api/packages/${currentPackage.id}`, currentPackage);
                setPackages(packages.map(pkg =>
                    pkg.id === currentPackage.id ? currentPackage : pkg
                ));
                toast.success('Package updated successfully');
            } else {
                // Add new package
                const res = await axios.post(`/api/packages`, currentPackage);
                setPackages([...packages, res.data]);
                toast.success('Package added successfully');
            }
            setShowPackageForm(false);
        } catch (err) {
            console.error('Failed to save package:', err);
            toast.error('Failed to save package');
        }
    };

    // Class CRUD operations
    const handleAddClass = (pkgId) => {
        setCurrentClass({
            id: null,
            name: '',
            price: null,
            seats: null,
            features: [],
            package_id: pkgId
        });
        setShowClassForm(true);
    };

    const handleEditClass = (cls) => {
        setCurrentClass({
            id: cls.id,
            name: cls.name,
            price: cls.price,
            seats: cls.seats,
            features: [...cls.features],
            package_id: selectedPackageId
        });
        setShowClassForm(true);
    };

    const handleDeleteClass = async (clsId) => {
        if (!window.confirm('Are you sure you want to delete this class?')) return;

        try {
            await axios.delete(`/api/classes/${clsId}`);
            setClasses(classes.filter(cls => cls.id !== clsId));
            toast.success('Class deleted successfully');
        } catch (err) {
            console.error('Failed to delete class:', err);
            toast.error('Failed to delete class');
        }
    };

    const handleClassSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentClass.id) {
                // Update existing class
                await axios.put(`/api/classes/${currentClass.id}`, currentClass);
                setClasses(classes.map(cls =>
                    cls.id === currentClass.id ? currentClass : cls
                ));
                toast.success('Class updated successfully');
            } else {
                // Add new class
                const res = await axios.post(`/api/packages/${selectedPackageId}/classes`, currentClass);
                setClasses([...classes, res.data]);
                toast.success('Class added successfully');
            }
            setShowClassForm(false);
        } catch (err) {
            console.log(currentClass)
            console.error('Failed to save class:', err);
            toast.error('Failed to save class');
        }
    };

    // Feature management
    const addFeature = () => {
        if (newFeature.trim() && !currentClass.features.includes(newFeature.trim())) {
            setCurrentClass({
                ...currentClass,
                features: [...currentClass.features, newFeature.trim()]
            });
            setNewFeature('');
        }
    };

    const removeFeature = (featureToRemove) => {
        setCurrentClass({
            ...currentClass,
            features: currentClass.features.filter(f => f !== featureToRemove)
        });
    };

    // Initial data load
    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

    // Loading and error states
    if (loading.packages && packages.length === 0) {
        return (
            <div className="p-6 flex justify-center items-center h-64">
                <div className="text-lg">Loading packages...</div>
            </div>
        );
    }

    if (error && packages.length === 0) {
        return (
            <div className="p-6">
                <div className="text-red-500 mb-4">{error}</div>
                <button
                    onClick={fetchPackages}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Packages</h2>
                <button
                    onClick={handleAddPackage}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add New Package
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    <p>{error}</p>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {packages.map((pkg, index) => (
                            <React.Fragment key={pkg.id}>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pkg.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{pkg.description}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{pkg.start_date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{pkg.end_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                                        <button
                                            onClick={() => handleViewClasses(pkg.id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                                            disabled={loading.classes && selectedPackageId === pkg.id}
                                        >
                                            {loading.classes && selectedPackageId === pkg.id ? (
                                                'Loading...'
                                            ) : (
                                                selectedPackageId === pkg.id ? 'Hide Classes' : 'View Classes'
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleEditPackage(pkg)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeletePackage(pkg.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>

                                {selectedPackageId === pkg.id && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 bg-gray-50">
                                            <div className="mt-2">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="font-bold text-lg">Package Classes</h4>
                                                    <button
                                                        onClick={() => handleAddClass(pkg.id)}
                                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                    >
                                                        Add Class
                                                    </button>
                                                </div>
                                                {loading.classes ? (
                                                    <div className="flex justify-center py-4">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                                    </div>
                                                ) : classes.length > 0 ? (
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead className="bg-gray-100">
                                                                <tr>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {classes.map((cls) => (
                                                                    <tr key={cls.id}>
                                                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{cls.name}</td>
                                                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${cls.price}</td>
                                                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{cls.seats}</td>
                                                                        <td className="px-3 py-2 text-sm text-gray-500">
                                                                            <ul className="list-disc list-inside space-y-1">
                                                                                {cls.features.map((feature, i) => (
                                                                                    <li key={i}>{feature}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </td>
                                                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 space-x-2">
                                                                            <button
                                                                                onClick={() => handleEditClass(cls)}
                                                                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDeleteClass(cls.id)}
                                                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <div className="text-center text-gray-500 py-4">No classes found for this package.</div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Package Form Modal */}
            {showPackageForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">
                            {currentPackage.id ? 'Edit Package' : 'Add New Package'}
                        </h3>
                        <form onSubmit={handlePackageSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="package-name">
                                    Name
                                </label>
                                <input
                                    id="package-name"
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={currentPackage.name}
                                    onChange={(e) => setCurrentPackage({ ...currentPackage, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="package-description">
                                    Description
                                </label>
                                <textarea
                                    id="package-description"
                                    className="w-full p-2 border rounded"
                                    value={currentPackage.description}
                                    onChange={(e) => setCurrentPackage({ ...currentPackage, description: e.target.value })}
                                    required
                                />
                            </div>
                             <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="package-name">
                                    Start Date
                                </label>
                                <input
                                    id="package-start_date"
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    value={currentPackage.start_date}
                                    onChange={(e) => setCurrentPackage({ ...currentPackage, start_date: e.target.value })}
                                    required
                                />
                            </div>
                             <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="package-name">
                                    End Date
                                </label>
                                <input
                                    id="package-end_date"
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    value={currentPackage.end_date}
                                    onChange={(e) => setCurrentPackage({ ...currentPackage, end_date: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowPackageForm(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Class Form Modal */}
            {showClassForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">
                            {currentClass.id ? 'Edit Class' : 'Add New Class'}
                        </h3>
                        <form onSubmit={handleClassSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class-name">
                                    Name
                                </label>
                                <input
                                    id="class-name"
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={currentClass.name}
                                    onChange={(e) => setCurrentClass({ ...currentClass, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class-price">
                                    Price
                                </label>
                                <input
                                    id="class-price"
                                    type="number"
                                    step="0.01"
                                    className="w-full p-2 border rounded"
                                    value={currentClass.price}
                                    onChange={(e) => setCurrentClass({ ...currentClass, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class-seats">
                                    Seats
                                </label>
                                <input
                                    id="class-seats"
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    value={currentClass.seats}
                                    onChange={(e) => setCurrentClass({ ...currentClass, seats: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Features
                                </label>
                                <div className="flex mb-2">
                                    <input
                                        type="text"
                                        className="flex-1 p-2 border rounded-l"
                                        value={newFeature}
                                        onChange={(e) => setNewFeature(e.target.value)}
                                        placeholder="Add a feature"
                                    />
                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="bg-blue-500 text-white px-3 rounded-r hover:bg-blue-600"
                                    >
                                        Add
                                    </button>
                                </div>
                                <ul className="space-y-1">
                                    {currentClass.features.map((feature, index) => (
                                        <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                            <span>{feature}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(feature)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowClassForm(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}